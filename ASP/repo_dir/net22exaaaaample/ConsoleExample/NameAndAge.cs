using System;
namespace ConsoleExample
{
    public class NameAndAge
    {
        public static void FindOldest()
        {
            int maxAge = 0;

            while (true)
            {
                
                string rivi = Console.ReadLine();

                if (rivi == "")
                {
                    return; // exit if rivi is empty
                    // myös break; toimii koska while-loopin sisällä
                }

                string name = "";
                string age = "";
                bool foundPilkku = false;

                for(int i = 0; i < rivi.Length; i++)
                {
                    char merkki = rivi[i];
                    Console.WriteLine($"i = {i}   merkki = {merkki}");

                    // 1. if
                    if (merkki == ',')
                    {
                        Console.WriteLine("Found pilkku!");
                        foundPilkku = true;
                    }

                    // tarkistetaan ettei merkki ole pilkku
                    if (merkki != ',')
                    {
                        // jos ei ollut pilkku, tarkistetaan ollaanko pilkun vasemmalla vai oikealla puolella
                        if (foundPilkku == true)
                        {
                            age = age + merkki;
                        }
                        else
                        {
                            name = name + merkki;
                        }
                    }

                    
                }

                Console.WriteLine($"name={name} age={age}");

            }

        }
    }
}

