# 프로젝트 설명

## 프로젝트 이름

algo-trade 프론트엔드 프로젝트

## 사용한 기술

페이지 로딩 시간 단축을 위해, 가능한 최소한의 라이브러리만 사용한다

- 프로그래밍 언어
    - [TypeScript](https://www.typescriptlang.org/)
- 사용 중인 라이브러리
    - [lodash](https://lodash.com/): 데이터 조작 라이브러리
    - [react, react-dom](https://ko.legacy.reactjs.org/): View 라이브러리
    - [react-router-dom](https://reactrouter.com/): React Router 라이브러리
    - [Tailwind CSS](https://tailwindcss.com/): 유틸리티 CSS 라이브러리
    - [daisyUI](https://daisyui.com/): Tailwind CSS 기반의 유틸리티 CSS 라이브러리
    - [Fetch API](https://developer.mozilla.org/ko/docs/Web/API/Fetch_API): 브라우저에서 기본으로 제공하는 HTTP 통신 API
- 사용 대기 라이브러리
    - [Zustand](https://zustand-demo.pmnd.rs/): 상태 관리 라이브러리
        - 추후, 관리해야 할 전역 상태가 많아지면 사용할 예정
    - [TanStack Query(React Query)](https://tanstack.com/query/latest): HTTP API 캐싱 데이터 관리 라이브러리
        - 추후, API 캐싱 기능이 필요한 경우 사용할 예정
    - [class-transformer](https://github.com/typestack/class-transformer): Model 클래스 라이브러리
        - 우선, 직접 구현한 BaseModel 클래스를 사용하고, 추가 기능이 필요한 경우 도입을 고민

# 사용한 외부 라이브러리

# 폴더 설명

해당 프로젝트는 FSD([Feature-seliced Design; 기능 분할 설계](https://feature-sliced.design/kr/)) v2.1 기준으로 폴더를 구성한다.

## \_\_tests__

테스트 파일을 선언한다.

## script

배포 스크립트를 선언한다.

## src/app

FSD Layer. App 을 시작하기 위한 컴포넌트를 선언한다.

## aws/pages

FSD Layer. Route 별 페이지를 구성하는 컴포넌트를 선언한다.

## aws/shared

FSD Layer. 여러 레이어에서 사용하는 컴포넌트를 선언한다.

---

# FSD 설명

## FSD 폴더 구성

- FSD 는 {`Layer`}/{`Slice`}/{`Segment`} 계층으로 폴더를 구성한다.   
  <img width="500" src="https://feature-sliced.design/kr/assets/images/visual_schema-e826067f573946613dcdc76e3f585082.jpg">
- [예외] `app`, `shared` Layer는 `Segment`계층만 가질 수 있다.
  ([링크](https://feature-sliced.design/kr/docs/get-started/overview#layers))
- `Layer` 는 의존성 순으로 `app` -> `pages` -> `widgets` -> `features` -> `entities` -> `shared` 가 있고,  
  순방향으로만 참조할 수 있다. ([링크](https://feature-sliced.design/kr/docs/get-started/overview#layers))
    - 예시: `app`에서 `pages`는 ${\color{green}{참조\ 가능}}$
    - 예시: `app`에서 `shared`는 ${\color{green}{참조\ 가능}}$
    - 예시: `pages`에서 `app`는 ${\color{red}{참조\ 불가능}}$
- `Slice`는 도메인 단위로 구성한다. ([링크](https://feature-sliced.design/kr/docs/reference/slices-segments#slices))
    - 예시: `pages/user_strategy`
    - 예시: `features/product_price`
- `Segment`는 기능 단위로 구성한다. ([링크](https://feature-sliced.design/kr/docs/reference/slices-segments#segments))
    - 예시: `pages/user_strategy/ui`: UI 관련 컴포넌트
    - 예시: `pages/user_strategy/api`: API 통신 관련 로직
    - 예시: `pages/user_strategy/model`: 비즈니스 관련 로직

## Layer 간 참조 규칙 ([링크](https://feature-sliced.design/kr/docs/reference/layers#import-rule-on-layers))

- `같은 Layer`의 `형제 Slice`는 참조할 수 없다.
    - 예시: `features/product_price` 에서 `features/strategy` ${\color{red}{참조\ 불가능}}$
- `같은 Slice`의 `형제 Segment`는 참조할 수 있다.
    - 예시: `features/product_price/api`에서 `features/product_price/lib` ${\color{green}{참조\ 가능}}$
- `상위 Layer`에서 `하위 Layer`의 `모든 Slice`를 참조할 수 있다.
    - 예시: `features/product_price`에서 `entities/product_price` ${\color{green}{참조\ 가능}}$
    - 예시: `features/product_price`에서 `entities/strategy` ${\color{green}{참조\ 가능}}$

- (예외) `entities Layer`는 cross-import(@x) API 을 사용해서 `형제 Slice`를 참조할 수 있다.
  ([링크](https://feature-sliced.design/kr/docs/reference/public-api#public-api-for-cross-imports))
    - 예시: `entities/strategy`에서 `entities/product/@x/strategy(참조하는 Slice 이름).ts` ${\color{green}{참조\ 가능}}$

## Public API

- `Slice`는 `Public API(index.ts 파일)`로 외부에서 필요한 컴포넌트만 내보낸다.
  ([링크](https://feature-sliced.design/kr/docs/reference/public-api))
- `shared Layer`를 제외하고, `Segment`에 대한 `Public API`를 선언하지 않는다.
  ([링크](https://feature-sliced.design/kr/docs/reference/public-api#worse-performance-of-bundlers-on-large-projects))
    - 예시: `features/comment/index.ts` ${\color{green}{추천}}$
    - 예시: `features/comment/ui/index.ts` ${\color{red}{비추천}}$ (Slice 의 Public API 가 있으므로 비추천)
- `shared/ui Segment`와 `shared/lib Segment`는 단일 `Public API`를 선언하지 말고, 하위 폴더 별로 `Public API`를 선언한다.
  ([링크](https://feature-sliced.design/kr/docs/reference/public-api#large-bundles))
    - 예시: `shared/ui/index.ts` ${\color{red}{비추천}}$
    - 예시: `shared/ui/button/index.ts` ${\color{green}{추천}}$
    - 예시: `shared/ui/text_filed/index.ts` ${\color{green}{추천}}$
- `같은 Slice`에서는 상대경로로 참조하고, `다른 Slice`에서는 절대경로로 참조한다
  ([링크](https://feature-sliced.design/kr/docs/reference/public-api#circular-imports))

