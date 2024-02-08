using System;

class Program
{
    static void Main()
    {
        Console.Write("Enter the number of fish caught: ");
        int totalFish = int.Parse(Console.ReadLine());

        int fishPerBear = totalFish / 4;
        int fishForCat = totalFish % 4;

        Console.WriteLine("Each bear receives: " + fishPerBear + " fish");
        Console.WriteLine("Cat receives: " + fishForCat + " fish");
    }
}
