import { Request, Response, NextFunction } from "express";

export const getQuote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { ticker } = req.params;

  try {
    const quoteApiResponse = await fetch(
      `https://brapi.dev/api/quote/${ticker}?token=baoXtjHkFGNtRUmTQFUELA`
    );

    if (!quoteApiResponse.ok) {
      const { status, statusText } = quoteApiResponse;
      return res.status(status).json({ message: statusText });
    }

    const quoteData = await quoteApiResponse.json();
    const stockPrice = quoteData.results[0].regularMarketPrice;

    return res.status(200).json({
      message: "Data retrieved successfully",
      quote: { ticker: ticker, price: stockPrice },
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
