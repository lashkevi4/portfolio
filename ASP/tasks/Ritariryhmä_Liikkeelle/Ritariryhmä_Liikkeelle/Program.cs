using System;

class KnightGroupMove
{
    static void Main()
    {
        Console.Title = "Knight Group On The Move";
        Console.Write("Target row? ");
        int row = Convert.ToInt32(Console.ReadLine());
        Console.Write("Target column? ");
        int column = Convert.ToInt32(Console.ReadLine());

        Console.WriteLine("\nSending knights.\n");

        // Изменён порядок смещений для соответствия порядку на картинке: слева, сверху, справа, снизу
        int[] dRow = { 0, -1, 0, 1 };
        int[] dCol = { -1, 0, 1, 0 };

        // Названия рыцарей для соответствия порядку на картинке
        string[] knightNames = { "Ritari yksi", "Ritari kaksi", "Ritari kolme", "Ritari neljä" };

        for (int i = 0; i < 4; i++)
        {
            int newRow = row + dRow[i];
            int newCol = column + dCol[i];

            if (newRow >= 1 && newRow <= 8 && newCol >= 1 && newCol <= 8)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine($"{knightNames[i]} kohteeseen ({newRow}, {newCol})");
                Console.ResetColor();
                Console.Beep();
            }
        }
    }
}
