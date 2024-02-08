using System;

class Watchtower
{
    static void Main()
    {
        Console.Write("Enter x coordinate: ");
        int x = Convert.ToInt32(Console.ReadLine());
        Console.Write("Enter y coordinate: ");
        int y = Convert.ToInt32(Console.ReadLine());

        string direction = "";

        if (x < 0 && y > 0)
            direction = "The enemy is to the northwest";
        else if (x == 0 && y > 0)
            direction = "The enemy is to the north";
        else if (x > 0 && y > 0)
            direction = "The enemy is to the northeast";
        else if (x < 0 && y == 0)
            direction = "The enemy is to the west";
        else if (x == 0 && y == 0)
            direction = "The enemy is right here";
        else if (x > 0 && y == 0)
            direction = "The enemy is to the east";
        else if (x < 0 && y < 0)
            direction = "The enemy is to the southwest";
        else if (x == 0 && y < 0)
            direction = "The enemy is to the south";
        else if (x > 0 && y < 0)
            direction = "The enemy is to the southeast";

        Console.WriteLine(direction);
    }
}
