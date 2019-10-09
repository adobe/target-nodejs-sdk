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

const uuid = require("../src/uuid");

describe("UUID utility", () => {
  it("uuid() should generate random UUIDs", () => {
    const uuid1 = uuid();
    const uuid2 = uuid();

    expect(uuid1).toEqual(jasmine.any(String));
    expect(uuid1.length).toEqual(32);
    expect(uuid1).not.toEqual(uuid2);
  });
});
