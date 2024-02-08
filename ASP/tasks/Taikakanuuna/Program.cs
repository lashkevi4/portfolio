int normal = 0;
int fire = 0;
int electric = 0;
int mix = 0;

for (int i = 1; i <= 100; i++)
{
  if (i % 3 == 0 && i % 5 == 0)
  {
    Console.ForegroundColor = ConsoleColor.Blue;
    Console.WriteLine($"{i}: Electric and Fire");
    mix++;
  }
  else if (i % 3 == 0)
  {
    Console.ForegroundColor = ConsoleColor.Red;
    Console.WriteLine($"{i}: Fire");
    fire++;
  }
  else if (i % 5 == 0)
  {
    Console.ForegroundColor = ConsoleColor.Yellow;
    Console.WriteLine($"{i}: Electric");
    electric++;
  }
  else
  {
    Console.ResetColor();
    Console.WriteLine($"{i}: Normal");
    normal++;
  }
  Console.ResetColor();
}
System.Console.WriteLine("");
System.Console.WriteLine("Normal = " + normal);
System.Console.WriteLine("Fire = " + fire);
System.Console.WriteLine("Electric = " + electric);
System.Console.WriteLine("MIX = " + mix);


