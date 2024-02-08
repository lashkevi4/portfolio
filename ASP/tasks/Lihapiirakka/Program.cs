using System;

class Money
{
  static void Main()
  {
    Console.Clear();

    //step1
    Console.Write("How much money do you have in your wallet? ");
    double walletAmount = Convert.ToDouble(Console.ReadLine());
    Console.WriteLine("");

    //step2
    Console.Write("What is the price of a meat pie? ");
    double piePrice = Convert.ToDouble(Console.ReadLine());
    Console.WriteLine("");

    //step3
    if (walletAmount >= piePrice)
    {
      double remainingAmount = walletAmount - piePrice;
      Console.WriteLine($"You can buy a pie. You will have {remainingAmount} Euro left after the purchase.");
    }
    else
    {
      Console.WriteLine("You don't have enough money. You should fast.");
    }

  }
}
