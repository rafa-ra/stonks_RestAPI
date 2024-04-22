import { Request, Response, NextFunction } from "express";
import UserStocks from "../models/userStocks";
import User from "../models/user";
import Transaction from "../models/transaction";

export const postBuy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, ticker, shares } = req.body;
    //checar se usuário tem saldo
    const dbUserData = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!dbUserData) {
      return res.status(404).json({ message: "User not found" });
    }

    const quoteApiResponse = await fetch(
      `https://brapi.dev/api/quote/${ticker}?token=baoXtjHkFGNtRUmTQFUELA`
    );

    if (!quoteApiResponse.ok) {
      const { status, statusText } = quoteApiResponse;
      return res.status(status).json({ message: statusText });
    }
    const quoteData = await quoteApiResponse.json();
    const stockPrice = quoteData.results[0].regularMarketPrice;
    const orderTotal = shares * stockPrice;

    let userCashBalance = dbUserData?.dataValues.cash;

    if (orderTotal > userCashBalance) {
      return res.status(403).json({ message: "Insufficient funds" });
    } else {
      const updatedBalance = userCashBalance - orderTotal;

      await User.update(
        { cash: updatedBalance },
        {
          where: {
            id: userId,
          },
        }
      );

      console.log(stockPrice);

      await UserStocks.create({
        user_id: userId,
        stock_symbol: ticker.toUpperCase(),
        shares: shares,
        price: stockPrice,
      });

      await Transaction.create({
        user_id: userId,
        stock_symbol: ticker.toUpperCase(),
        price: stockPrice,
        shares: shares,
        total: orderTotal,
        type: "Purchase",
      });

      return res.status(200).json({
        message: "Purchase concluded successfully",
        purchase: { ticker: "", price: "", shares: "", orderTotal: "" },
      });
    }
  } catch (err) {}
};
