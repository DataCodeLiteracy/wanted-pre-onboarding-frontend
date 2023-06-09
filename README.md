# 원티드 프리온보딩 프론트엔드 인턴십 (6월)

## 배포 사이트

https://wanted-todoapp.netlify.app

## 이름 : 이종현

## 프로젝트의 설치 및 실행 방법

main 브랜치 git clone 후

npm install 으로 설치 후

npm start 명령어로 실행한다.

## 프로젝트 구조도

![](https://velog.velcdn.com/images/dataliteracy/post/802f8af3-ad3e-40f2-8d03-d491920781d2/image.png)

## 기능 구현 영상

### Assignment 1

회원가입과 로그인 페이지에 이메일과 비밀번호의 유효성 검사기능을 구현해주세요.
입력된 이메일과 비밀번호가 유효성 검사를 통과하지 못한다면 button에 disabled 속성을 부여해주세요.

![유효성검사](https://github.com/DataCodeLiteracy/wanted-pre-onboarding-frontend/assets/103319477/a0aeee39-2397-4697-b736-99221047a3d9)

### Assignment 2

회원가입 페이지에서 버튼을 클릭 시 회원가입을 진행하고 회원가입이 정상적으로 완료되었을 시 /signin 경로로 이동해주세요.

![회원가입](https://github.com/DataCodeLiteracy/wanted-pre-onboarding-frontend/assets/103319477/949aa856-f385-4731-b567-facf1fcd009c)

### Assignment 3

로그인 페이지에서 버튼을 클릭 시, 로그인을 진행하고 로그인이 정상적으로 완료되었을 시 /todo 경로로 이동해주세요.
로그인 API는 로그인이 성공했을 시 Response Body에 JWT를 포함해서 응답합니다.

![로그인](https://github.com/DataCodeLiteracy/wanted-pre-onboarding-frontend/assets/103319477/db0617b2-da1e-477f-8ec5-b47d0d3f3f30)

### Assignment 4

로그인 여부에 따른 리다이렉트 처리를 구현해주세요

- 로컬 스토리지에 토큰이 있는 상태로 /signin 또는 /signup 페이지에 접속한다면 /todo 경로로 리다이렉트 시켜주세요
- 로컬 스토리지에 토큰이 없는 상태로 /todo페이지에 접속한다면 /signin 경로로 리다이렉트 시켜주세요

![로컬스토리지O_리다이렉션](https://github.com/DataCodeLiteracy/wanted-pre-onboarding-frontend/assets/103319477/d2f8ba99-1bd6-4ec2-bc59-15238bc897ad)

### Assignment 5

/todo경로에 접속하면 투두 리스트의 목록을 볼 수 있도록 해주세요
목록에서는 TODO의 내용과 완료 여부가 표시되어야 합니다.

![TODOLIST](https://github.com/DataCodeLiteracy/wanted-pre-onboarding-frontend/assets/103319477/f23733f2-45f4-4fc0-ac09-10163d25993f)

### Assignment 6

리스트 페이지에 새로운 TODO를 입력할 수 있는 input과 추가 button을 만들어주세요
추가 button을 클릭하면 입력 input의 내용이 새로운 TODO로 추가되도록 해주세요
TODO를 추가 한 뒤 새로고침을 해도 추가한 TODO가 목록에 보여야 합니다.

![ADDTODO](https://github.com/DataCodeLiteracy/wanted-pre-onboarding-frontend/assets/103319477/878c7cd4-d851-4bef-a4ed-ce271bd79841)

### Assignment 7

TODO의 체크박스를 통해 완료 여부를 수정할 수 있도록 해주세요.

### Assignment 8

TODO 우측에 수정버튼과 삭제 버튼을 만들어주세요

### Assignment 9

투두 리스트의 TODO 우측의 삭제버튼을 누르면 해당 아이템이 삭제되도록 해주세요

![DELETETODO](https://github.com/DataCodeLiteracy/wanted-pre-onboarding-frontend/assets/103319477/14542462-8690-4a47-81ce-02fa8de4c4f6)

### Assignment 10

TODO 우측의 수정 버튼을 누르면 수정모드가 활성화 되도록 해주세요
수정모드에서는 TODO의 내용을 변경할 수 있어야 합니다.
수정모드에서는 TODO의 내용이 input창 안에 입력된 형태로 변경해주세요
수정모드에서는 TODO의 우측에 제출버튼과 취소버튼이 표시되게 해주세요
제출버튼을 누르면 수정한 내용을 제출해서 내용이 업데이트 될 수 있도록 해주세요
취소버튼을 누르면 수정한 내용을 초기화 하고, 수정모드를 비활성화 해주세요

![UPDATETODO](https://github.com/DataCodeLiteracy/wanted-pre-onboarding-frontend/assets/103319477/8d91ab0b-cfe2-426a-9673-c7482da3fab8)
