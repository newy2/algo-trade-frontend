import { assert, describe, test } from "vitest";
import BaseModel from "../src/model/BaseModel";
import * as _ from "lodash";

describe("Single level JSON 을 Model 객체로 변환하는 방법", () => {
  class NameModel extends BaseModel {
    private firstName: string;
    private lastName: string;

    getFullName() {
      return `My name is ${this.firstName}, ${this.lastName}`;
    }
  }

  test("object 를 Model 객체로 변환하기", () => {
    const json = {
      firstName: "Jay",
      lastName: "Yoon",
    };

    const model = NameModel.fromJson(json);
    assert.equal(model.getFullName(), "My name is Jay, Yoon");
  });

  test("object array 를 Model 객체로 변환하디", () => {
    const array = [
      {
        firstName: "Jay",
        lastName: "Yoon",
      },
      {
        firstName: "Ali",
        lastName: "Kim",
      },
    ];

    const models = NameModel.fromJson(array);
    assert.equal(models[0].getFullName(), "My name is Jay, Yoon");
    assert.equal(models[1].getFullName(), "My name is Ali, Kim");
  });
});

describe("Multi level JSON 을 Model 객체로 변환하는 방법", () => {
  const json = {
    hobbies: [
      {
        hobby: "soccer",
        rate: 6,
      },
      {
        hobby: "basketball",
        rate: 5,
      },
    ],
  };

  class ParentModel extends BaseModel {
    private hobbies: ChildModel[];

    override onCreated() {
      this.hobbies = ChildModel.fromJson(this.hobbies);
    }

    getHobbies() {
      return this.hobbies.map((each) => each.getMessage());
    }
  }

  class ChildModel extends BaseModel {
    private hobby: string;
    private rate: number;

    getMessage() {
      return `My hobby is ${this.hobby} (${this.rate}/10)`;
    }
  }

  test("object 를 Model 객체로 변환하기", () => {
    const model = ParentModel.fromJson(_.cloneDeep(json));
    assert.deepEqual(model.getHobbies(), [
      "My hobby is soccer (6/10)",
      "My hobby is basketball (5/10)",
    ]);
  });

  describe("부모 Model 의 onCreated 에서 자식 Model 을 초기화 하지 않은 경우", () => {
    class IncorrectParentModel extends ParentModel {
      override onCreated() {
        // 자식 Model 을 초기화 하지 않은 경우
      }
    }

    test("literal object 를 Model 객체로 변환하기", () => {
      const model = IncorrectParentModel.fromJson(_.cloneDeep(json));
      assert.throw(() => {
        model.getHobbies();
      }, "each.getMessage is not a function");
    });
  });
});
