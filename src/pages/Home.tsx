import AppHeader from '../components/AppHeader'
import { Title, WhiteShadowTitle, Wrapper, Main } from '../styles/HomeStyle'

export default function Home() {
  return (
    <Wrapper>
      <AppHeader />
      <Main>
        <Title>FRONTEND</Title>
        <WhiteShadowTitle>INTERNSHIP</WhiteShadowTitle>
      </Main>
      <div>Made By DataLiteracy</div>
    </Wrapper>
  )
}
