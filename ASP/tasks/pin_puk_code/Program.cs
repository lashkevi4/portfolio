using System;

class Program
{
  static void Main()
  {
    //step1
    Console.Clear();
    string correctPin = "1234";
    string correctPuk = "12345678";
    string userInput;

    //step2
    Console.Write("Enter a 4-digit PIN code: ");
    userInput = Console.ReadLine();

    for (int i = 0; i < 2; i++)
    {
      if (userInput == correctPin)
      {
        Console.WriteLine("PIN accepted.");
        return;
      }
      Console.Write("Incorrect PIN. Please re-enter: ");
      userInput = Console.ReadLine();
    }

    //step3
    Console.Write("Enter an 8-digit PUK code: ");
    userInput = Console.ReadLine();

    for (int i = 0; i < 2; i++)
    {
      if (userInput == correctPuk)
      {
        Console.WriteLine("PUK accepted. Your PIN is now unblocked.");
        return;
      }
      Console.Write("Incorrect PUK. Please re-enter: ");
      userInput = Console.ReadLine();
    }

    Console.WriteLine("PUK blocked. Access denied.");
  }
}
