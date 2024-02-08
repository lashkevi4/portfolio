using System;

class Program
{
  static void Main()
  {
    int[] numbers = { 1, -3, 5, -7, 9 };

    InvertNumbers(numbers);

    Console.Write("Inverted numbers: ");
    foreach (int number in numbers)
    {
      Console.Write(number + " ");
    }
  }

  static void InvertNumbers(int[] nums)
  {
    for (int i = 0; i < nums.Length; i++)
    {
      nums[i] = -nums[i];
    }
  }
}
