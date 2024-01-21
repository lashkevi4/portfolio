using System;

namespace ConsoleExample
{
    public class LoopExamples
    {
        static int z = 0; // static field (suomeksi luokka muuttuja / luokka kenttä)

        internal static void StaticMethod1()
        {
            Console.WriteLine("RIVI 9");

            // for-loop versio
            for (
                int i = 0; // i lähtee nollasta
                i < 3;     // while:n ehto on että i < 5
                i++        // loop:n LOPUKSI i:n arvoa kasvatetaan yhdellä
            )
            {
                Console.WriteLine($"in a for loop  (i={i})");
                Thread.Sleep(400);
            }

            //while loop versio
            int k = 0;
            while (k < 3)
            {
                // jos ehto toteuttuuu (true) saa tulle looppiin.
                Console.WriteLine($"in a while loop  (k={k})");
                Thread.Sleep(400);
                k++;
            }

            // NIKI + IKÄ  .....


            // foreach-versio
            foreach (object x in new List<object>() { 1, "tekstiä", true, 1.618, null })
            {
                Console.WriteLine($"in a foreach loop: {x}");  // x ei tarkoita indexiä, vaan listan alkio
                Thread.Sleep(400);
            }

            // recursiivinen?
            RecursiveLoop();
        }

        private static void RecursiveLoop() // static / luokka metodi
        {
            z++; // z:n arvoon lisätään 1
            if (z < 3)
            {
                Console.WriteLine($"In recursive loop (z={z})");
                RecursiveLoop();  // kutsuu itseään... joutuu siis looppiin...
            }
        }

        // static: luokkametodi  / luokka muuttujat
        public void InstanceMethod1()
        {
            StaticMethod1();
        }
    }
}

