import {Container} from "@mui/material";
import {PayWrapper} from "../components/PayWrapper";

export default function Home() {
  return (
    <Container style={{display:"flex", justifyContent:"center", alignItems:"center", height:"100vh"}}>
      <PayWrapper/>
    </Container>
  )
}
