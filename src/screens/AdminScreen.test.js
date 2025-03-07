import React from "react";
import { shallow, mount } from "enzyme";
import { act } from "react-dom/test-utils";

import AdminScreen from "./AdminScreen";

const usersData = [
  {
    id: "1",
    name: "Aaron Miles",
    email: "aaron@mailinator.com",
    role: "member",
  },
  {
    id: "2",
    name: "Aishwarya Naik",
    email: "aishwarya@mailinator.com",
    role: "member",
  },
  {
    id: "3",
    name: "Arvind Kumar",
    email: "arvind@mailinator.com",
    role: "admin",
  },
];

describe("AdminScreen", () => {
  let wrapper;
  let useEffect;

  const mockUseEffect = () => {
    useEffect.mockImplementationOnce((f) => f());
  };

  beforeEach(() => {
    fetch.resetMocks();
    useEffect = jest.spyOn(React, "useEffect");
    mockUseEffect();
    mockUseEffect();

    wrapper = shallow(<AdminScreen />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("AdminScreen should render", () => {
    shallow(<AdminScreen />);
  });

  it("Initial search value should be empty", () => {
    expect(wrapper.find('input[name="searchInput"]').prop("value")).toBe("");
  });

  it("Search value should update", () => {
    wrapper.find('input[name="searchInput"]').simulate("change", {
      target: {
        value: "aaron",
      },
    });
    expect(wrapper.find('input[name="searchInput"]').prop("value")).toBe(
      "aaron"
    );
  });

  it("API should trigger", async () => {
    await act(async () => {
      await fetch.mockResponseOnce(() => Promise.resolve(usersData));
      wrapper = mount(<AdminScreen />);
    });

    await expect(fetch).toHaveBeenCalledWith(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );

    await expect(fetch).toHaveBeenCalledTimes(1);
  });
});
