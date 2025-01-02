import {
  afterAll,
  afterEach,
  assert,
  beforeAll,
  beforeEach,
  describe,
  test,
} from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { JsonApiUtil } from "../../../src/shared/api";

const mockServer = setupServer();

describe("JsonApiUtil 테스트", () => {
  const BASE_URL = "http://localhost:9999";
  const PATH = "/api/sample";
  const apiUtil = JsonApiUtil.getInstance(BASE_URL);

  beforeAll(() => mockServer.listen({ onUnhandledRequest: "warn" }));
  afterEach(() => mockServer.resetHandlers());
  afterAll(() => mockServer.close());

  describe("Request Body 를 사용하지 않는 HTTP 메서드", () => {
    beforeEach(() => {
      ["get", "delete"].forEach((eachMethod) => {
        mockServer.use(
          http[eachMethod](BASE_URL + PATH, async ({ request }) => {
            const requestUrl = new URL(request.url);
            return HttpResponse.json({
              pathname: requestUrl.pathname,
              queryString: requestUrl.searchParams.toString(),
            });
          }),
        );
      });
    });

    describe("HTTP GET 메서드", () => {
      test("쿼리 스트링이 없는 경우", async () => {
        const response = await apiUtil.GET(PATH);

        assert.deepEqual(response, {
          pathname: PATH,
          queryString: "",
        });
      });

      test("쿼리 스트링이 있는 경우", async () => {
        const requestParams = {
          name: "jay",
          groups: [1, 2],
        };
        const response = await apiUtil.GET(PATH, requestParams);

        assert.deepEqual(response, {
          pathname: PATH,
          queryString: "name=jay&groups=1&groups=2",
        });
      });
    });

    describe("HTTP DELETE 메서드", () => {
      test("쿼리 스트링이 없는 경우", async () => {
        const response = await apiUtil.DELETE(PATH);

        assert.deepEqual(response, {
          pathname: PATH,
          queryString: "",
        });
      });

      // memo: DELETE 메서드에서 쿼리 스트링을 사용하지 않을 예정임
    });
  });

  describe("Request Body 를 사용하는 HTTP 메서드", () => {
    const REQUEST_BODY = {
      name: "jay",
      groups: [1, 2],
    };
    const EMPTY_BODY = {};

    beforeEach(() => {
      ["post", "put", "patch"].forEach((eachMethod) => {
        mockServer.use(
          http[eachMethod](BASE_URL + PATH, async ({ request }) => {
            return HttpResponse.json({
              requestBody: await request.json(),
            });
          }),
        );
      });
    });

    describe("HTTP POST 메서드", () => {
      test("Request Body 가 있는 경우", async () => {
        const response = await apiUtil.POST(PATH, REQUEST_BODY);

        assert.deepEqual(response, {
          requestBody: REQUEST_BODY,
        });
      });

      test("Request Body 가 empty 인 경우", async () => {
        try {
          await apiUtil.POST(PATH, EMPTY_BODY);
        } catch (e) {
          assert.equal(e.message, "empty body 를 사용할 수 없습니다.");
        }
      });
    });

    describe("HTTP PUT 메서드", () => {
      test("Request Body 가 있는 경우", async () => {
        const response = await apiUtil.PUT(PATH, REQUEST_BODY);

        assert.deepEqual(response, {
          requestBody: REQUEST_BODY,
        });
      });

      test("Request Body 가 empty 인 경우", async () => {
        try {
          await apiUtil.PUT(PATH, EMPTY_BODY);
        } catch (e) {
          assert.equal(e.message, "empty body 를 사용할 수 없습니다.");
        }
      });
    });

    describe("HTTP PATCH 메서드", () => {
      test("Request Body 가 있는 경우", async () => {
        const response = await apiUtil.PATCH(PATH, REQUEST_BODY);

        assert.deepEqual(response, {
          requestBody: REQUEST_BODY,
        });
      });

      test("Request Body 가 empty 인 경우", async () => {
        try {
          await apiUtil.PATCH(PATH, EMPTY_BODY);
        } catch (e) {
          assert.equal(e.message, "empty body 를 사용할 수 없습니다.");
        }
      });
    });
  });
});

describe("JsonApiUtil Error 테스트", () => {
  const BASE_URL = "http://localhost:9999";
  const ERROR_PATH = "/api/error";
  const apiUtil = JsonApiUtil.getInstance(BASE_URL);

  beforeAll(() => {
    mockServer.listen({ onUnhandledRequest: "warn" });
  });
  afterEach(() => mockServer.resetHandlers());
  afterAll(() => mockServer.close());

  beforeEach(() => {
    ["get", "delete", "post", "put", "patch"].forEach((eachMethod) => {
      mockServer.use(
        http[eachMethod](BASE_URL + ERROR_PATH, async () => {
          throw Error("서버 에러 발생");
        }),
      );
    });
  });

  test("HTTP GET 메서드 서버 에러", async () => {
    try {
      await apiUtil.GET(ERROR_PATH);
    } catch (e) {
      assert.equal(e.message, "서버 에러 발생");
      assert.equal(e.name, "Error");
      assert.isNotEmpty(e.stack);
    }
  });

  test("HTTP DELETE 메서드 서버 에러", async () => {
    try {
      await apiUtil.DELETE(ERROR_PATH);
    } catch (e) {
      assert.equal(e.message, "서버 에러 발생");
      assert.equal(e.name, "Error");
      assert.isNotEmpty(e.stack);
    }
  });

  test("HTTP POST 메서드 서버 에러", async () => {
    try {
      const body = { name: "jay" };
      await apiUtil.POST(ERROR_PATH, body);
    } catch (e) {
      assert.equal(e.message, "서버 에러 발생");
      assert.equal(e.name, "Error");
      assert.isNotEmpty(e.stack);
    }
  });

  test("HTTP PUT 메서드 서버 에러", async () => {
    try {
      const body = { name: "jay" };
      await apiUtil.PUT(ERROR_PATH, body);
    } catch (e) {
      assert.equal(e.message, "서버 에러 발생");
      assert.equal(e.name, "Error");
      assert.isNotEmpty(e.stack);
    }
  });

  test("HTTP PATCH 메서드 서버 에러", async () => {
    try {
      const body = { name: "jay" };
      await apiUtil.PATCH(ERROR_PATH, body);
    } catch (e) {
      assert.equal(e.message, "서버 에러 발생");
      assert.equal(e.name, "Error");
      assert.isNotEmpty(e.stack);
    }
  });
});
