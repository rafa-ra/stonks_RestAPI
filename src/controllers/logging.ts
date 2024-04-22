import express from "express";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";

export const postSignup = (req: Request, res: Response, next: NextFunction) => {
  //Pegar as informações do corpo da request
  const { username, password, confirmPassword } = req.body as {
    username: string;
    password: string;
    confirmPassword: string;
  };

  if (
    !username ||
    username == "" ||
    !password ||
    password == "" ||
    !confirmPassword ||
    confirmPassword == "" ||
    password != confirmPassword
  ) {
    return res
      .status(400)
      .json({ message: "Please provide valid signup information" });
  }
  try {
    //Validar se usuário já existe
    (async () => {
      const userExists = await User.findOne({
        where: {
          userName: username,
        },
      });
      //  Sim?

      if (userExists) {
        //    Retornar erro
        return res
          .status(200)
          .json({ message: "Já existe um usuário cadastrado com este nome" });
      } else {
        console.log("---------------");
        //    Criptografar a senha
        if (password == confirmPassword) {
          const hash: string = await bcrypt.hash(password, 12);
          await User.create({ userName: username, hash: hash });
          return res
            .status(200)
            .json({ message: "User registerd successfully", user: username });
        }
      }
    })();
  } catch (err) {
    res.status(400).json({ message: "Bad Request" });
    console.log(err);
  }
};

export const postLogin = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body as {
    username: string;
    password: string;
  };

  interface UserAttributes {
    id: number;
    userName: string;
    hash: string;
  }

  (async () => {
    try {
      const user: any = await User.findOne({
        where: {
          username: username,
        },
      });

      if (!user) {
        res.status(200).json({ message: "Usuário não encontrado" });
      } else {
        const userId = user.dataValues.id;

        if (await bcrypt.compare(password, user.hash)) {
          const token = jwt.sign(
            { username: username, userId: userId },
            "asd321",
            { expiresIn: "1h" }
          );

          res.status(200).json({
            message: "User authenticated",
            user: userId.toString(),
            token: token,
          });
        } else {
          res.status(403).json({ message: "Senha incorreta" });
        }
      }
    } catch (err) {
      console.log(err);
    }
  })();
};
