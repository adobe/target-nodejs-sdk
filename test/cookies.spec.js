/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const {
  parseCookies,
  createTargetCookie,
  TARGET_COOKIE
} = require("../src/cookies");

describe("Cookies utility", () => {
  it("should return empty object when cookie is missing", () => {
    expect(parseCookies(undefined)).toEqual({});
    expect(parseCookies(null)).toEqual({});
    expect(parseCookies("")).toEqual({});
  });

  it("should return empty cookies object when incorrect cookie format", () => {
    const targetCookie = "a#1";
    const result = parseCookies(targetCookie);

    expect(result).toEqual({});
  });

  it("should return empty cookies object when cookie has incorrect ttl format", () => {
    const targetCookie = "a#1#b";
    const result = parseCookies(targetCookie);

    expect(result).toEqual({});
  });

  it("should return cookies object when no cookie is expired", () => {
    const targetCookie = "a#1#9596233214|b#2#9596233214";
    const result = parseCookies(targetCookie);

    expect(Object.keys(result)).toEqual(["a", "b"]);
    expect(result.a.value).toEqual("1");
    expect(result.b.value).toEqual("2");
  });

  it("should return cookies object when a cookie is expired", () => {
    const targetCookie = "a#1#9596233214|b#2#1296233214";
    const result = parseCookies(targetCookie);

    expect(Object.keys(result)).toEqual(["a"]);
    expect(result.a.value).toEqual("1");
  });

  it("should create cookie object", () => {
    const cookie = [{ name: "a", value: 1, expires: 9296233214 }];
    const result = createTargetCookie(cookie);

    expect(result.name).toEqual(TARGET_COOKIE);
    expect(result.value).toEqual("a#1#9296233214");
    expect(result.maxAge).toEqual(jasmine.any(Number));
  });
});
