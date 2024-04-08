"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSignup = void 0;
const postSignup = (req, res, next) => {
    return res.status(200).json({ message: "Usuário cadastrado com sucesso" });
};
exports.postSignup = postSignup;
