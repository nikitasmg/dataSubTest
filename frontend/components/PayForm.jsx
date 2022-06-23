import {Button, InputAdornment, TextField} from "@mui/material";
import {Box} from "@mui/system";
import {MyForm} from "./ui/MyForm";
import {Title} from "./ui/Title";
import {useForm, Controller} from "react-hook-form";
import {luhnCheck} from "../helpers/lunCheck";
import {useFetch} from "../hooks/useFetch";

export const PayForm = () => {
    const {control, handleSubmit, formState, resetField} = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
        //Для удобвства предзаполненые данные
        defaultValues: {
            cardNumber: '4917881439840940',
            expDate: '20/2022',
            cvv: '123',
            amount: '1234',
        }
        // // Пример данных
        // }  defaultValues: {
        //     cardNumber: '4917881439840940',
        //     expDate: '20/2022',
        //     cvv: '123',
        //     amount: '1234',
        // }
    });
    const {request} = useFetch()
    const onSubmit = async data => {
        await request('POST',data, 'addData')
        await resetField('cardNumber')
        await resetField('expDate')
        await resetField('cvv')
        await resetField('amount')
    };

    return (
        <MyForm component={'form'}
                onSubmit={handleSubmit(onSubmit)}
                sx={{display: 'flex', flexDirection: 'column'}}
        >
            <Title>Для покупки введите данные карты</Title>

            <Controller
                name={'cardNumber'}
                control={control}
                rules={
                    {
                        required: 'Обязательное поле',
                        validate: {
                            length: v => v.length === 16 || 'Длина должны быть 16',
                            luhnAlgoritm: v => luhnCheck(v) || 'Некорректные данные',
                        },
                        pattern: {
                            value: /^(0|[1-9]\d*)(\.\d+)?$/,
                            message: 'Только числа'
                        },
                    }}

                render={({field, fieldState: {invalid, error}}) =>
                    <TextField sx={{marginBottom: 4, appearance: 'none'}}
                               fullWidth
                               inputProps={{maxLength: 16}}
                               error={invalid}
                               helperText={invalid ? error.message : ''}
                               label="Номер карты"
                               autoFocus
                               {...field}
                    />}
            />
            <Box sx={{display: 'flex', justifyContent: 'space-between', marginBottom: 3}}>
                <Controller name={'expDate'}
                            control={control}
                            rules={{
                                required: 'Обязательное поле',
                                pattern: {
                                    value: /^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([2][0][0-9]{2})$/,
                                    message: 'Неверный формат даты'
                                }
                            }}
                            render={({field, fieldState: {invalid, error}}) =>
                                <TextField
                                    sx={{width: '50%'}}
                                    label="DD/YYYY"
                                    error={invalid}
                                    helperText={invalid ? error.message : ''}
                                    inputProps={{maxLength: 7}}
                                    {...field}
                                    autoFocus
                                />

                            }
                />
                <Controller
                    name={'cvv'}
                    control={control}
                    rules={
                        {
                            required: 'Обязательное поле',
                            minLength: {
                                value: 3,
                                message: 'Минимум 3 цифры'
                            },
                            pattern: {
                                value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                message: 'Только числа'
                            },
                        }}
                    render={({field, fieldState: {invalid, error}}) =>
                        <TextField
                            sx={{maxWidth: '20%'}}
                            label="CVV"
                            inputProps={{maxLength: 3}}
                            error={invalid}
                            helperText={invalid ? error.message : ''}
                            {...field}
                            autoFocus
                        />}
                />
            </Box>
            <Controller
                name={'amount'}
                control={control}
                rules={{
                    required: 'Обязательное поле',
                    pattern: {
                        value: /^(0|[1-9]\d*)(\.\d+)?$/,
                        message: 'Только числа'
                    },
                }}
                render={({field, fieldState: {invalid, error}}) =>
                    <TextField
                        sx={{marginBottom: 3}}
                        label="Цена"
                        error={invalid}
                        helperText={invalid ? error.message : ''}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">₽</InputAdornment>,
                        }}
                        {...field}
                        autoFocus
                    />}
            />
            <Button sx={{width: '35%', padding: 2, alignSelf: 'end', backgroundColor: 'palette.primary.main'}}
                    type={"submit"}
                    variant={'contained'}
                    disableElevation={true}
                    disabled={!formState.isValid}
            >
                Купить
            </Button>
        </MyForm>
    );
};