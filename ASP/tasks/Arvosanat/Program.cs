using System;

class Program
{
  static void Main()
  {
    Console.Clear();

    //step1
    Console.Write("Enter the numerical grade (0-5): ");
    int grade = Convert.ToInt32(Console.ReadLine());
    Console.Write("");

    //step2
    switch (grade)
    {
      case 0:
        Console.WriteLine("The verbal assessment is: fail.");
        break;
      case 1:
        Console.WriteLine("The verbal assessment is: satisfactory.");
        break;
      case 2:
        Console.WriteLine("The verbal assessment is: fair.");
        break;
      case 3:
        Console.WriteLine("The verbal assessment is: good.");
        break;
      case 4:
        Console.WriteLine("The verbal assessment is: very good.");
        break;
      case 5:
        Console.WriteLine("The verbal assessment is: excellent.");
        break;
      default:
        Console.WriteLine("Error: The grade must be between 0 and 5.");
        break;
    }
  }
}
