const ensureAuthenticated = require("./ensureAuthenticated");
const AppError = require("../../../errors/AppError");

describe("ensureAuthenticated Middleware", () => {
  it("deve barrar a requisição e lançar um AppError se o token não for enviado", () => {
    const request = { headers: {} };
    const response = {};
    const next = jest.fn();

    expect(() => {
      ensureAuthenticated(request, response, next);
    }).toThrow(AppError);
  });

  it("deve barrar a requisição se o formato do token for inválido (sem o Bearer)", () => {
    const request = {
      headers: {
        authorization: "TokenMalucosemBearer12345",
      },
    };
    const response = {};
    const next = jest.fn();

    expect(() => {
      ensureAuthenticated(request, response, next);
    }).toThrow(AppError);
  });
});
