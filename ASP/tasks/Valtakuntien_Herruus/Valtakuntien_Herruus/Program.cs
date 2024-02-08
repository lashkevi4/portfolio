using System;

class Program
{
    static void Main()
    {
        Console.Write("Enter the number of farms: ");
        int farms = int.Parse(Console.ReadLine());

        Console.Write("Enter the number of duchies: ");
        int duchies = int.Parse(Console.ReadLine());

        Console.Write("Enter the number of provinces: ");
        int provinces = int.Parse(Console.ReadLine());

        int score = farms * 1 + duchies * 3 + provinces * 6;

        Console.WriteLine("Total score: " + score);
    }
}
