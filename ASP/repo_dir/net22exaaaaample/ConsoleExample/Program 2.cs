// See https://aka.ms/new-console-template for more information
using ConsoleExample;

// NET6 -> Program.cs ei sisällä Progra-luokan ja Main-metodin määritelmää
// NET 5.0 tyyli on ns. classic tapa...


// namespace = ConsoleExample
// class LoopExamples
// ListAndLoop  (metodi, koska sulut..)
//   ListAndLoop on luokkametodi = ei tarvitse oliota, jotta voidaan kutsua metodia
// ConsoleExample.LoopExamples.StaticMethod1();

LoopExamples olio = new LoopExamples();

// oliosta käsin voi kutsua (julkisia) instanssi-metodeja JA luokka-metodeja
// olio.InstanceMethod1(); // InstanceMethod1 on instanssi-metodi


NameAndAge.FindOldest();

