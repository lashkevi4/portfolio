using System;

class Game
{
  static void Main()
  {
    //step1
    Console.Clear();
    Console.WriteLine("Please select:");
    Console.WriteLine("");
    Console.WriteLine("KIVI   = 1");
    Console.WriteLine("PAPERI = 2");
    Console.WriteLine("SAKSET = 3");
    Console.WriteLine("");
    int playerChoice = Convert.ToInt32(Console.ReadLine());
    Console.WriteLine("");

    //step2
    Console.Write("Computer select: ");

    for (int i = 0; i < 4; i++)
    {
      Console.Write(".");
      Thread.Sleep(450); // .45 sek
    }

    Random rnd = new Random();
    int computerChoice = rnd.Next(1, 4);

    Console.Write(" " + computerChoice);
    Console.WriteLine("");

    //step3
    if (playerChoice == computerChoice)
    {
      Console.WriteLine("");
      Console.WriteLine("Draw !!!");
    }
    else if ((playerChoice == 1 && computerChoice == 3) ||
             (playerChoice == 2 && computerChoice == 1) ||
             (playerChoice == 3 && computerChoice == 2))
    {
      Console.WriteLine("");
      Console.ForegroundColor = ConsoleColor.Green;
      Console.WriteLine("Player WIN !!!");
    }
    else
    {
      Console.WriteLine("");
      Console.ForegroundColor = ConsoleColor.Red;
      Console.WriteLine("Computer WIN !!!");
    }
  }
}
