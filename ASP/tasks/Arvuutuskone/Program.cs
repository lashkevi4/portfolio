using System;

class Game
{
  static void Main()
  {
    //step1
    Console.Write("User 1, enter a number between 0 and 100: ");
    int x = Convert.ToInt32(Console.ReadLine());
    Console.Clear();

    //step2
    Console.WriteLine("User 2, guess the number.");
    int y = -1; // Инициализируем y значением, которое гарантированно не равно x
    while (x != y) // Цикл должен продолжаться, пока y не станет равно x
    {
      Console.ForegroundColor = ConsoleColor.White;

      Console.Write("What is your next guess? ");
      y = Convert.ToInt32(Console.ReadLine());

      if (y < x)
      {
        Console.ForegroundColor = ConsoleColor.Red;

        Console.WriteLine(y + " is too low");
      }
      else if (y > x)
      {
        Console.ForegroundColor = ConsoleColor.Yellow;

        Console.WriteLine(y + " is too high");
      }
    }
    Console.ForegroundColor = ConsoleColor.Green;
    Console.WriteLine("You WIN!!!");
  }
}
