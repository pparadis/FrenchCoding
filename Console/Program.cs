using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Text;
using CollectionTests;

namespace Console
{
    class Program
    {
        static void Main(string[] args)
        {
            //List<dynamic> elements = new List<dynamic>();
            //elements.Add("Zéro");
            //elements.Add("Un");
            //elements.Add("Deux");
            //elements.Add("Trois");
            //elements.Add("Quatre");
            //elements.Add("Cinq");
            //elements.Add("Six");
            //elements.Add("Sept");
            //elements.Add("Huit");
            //elements.Add("Neuf");
            //elements.Add("Dix");
            //elements.Add("Onze");
            //elements.Add("Douze");

            //foreach(var x in YieldTest.GetUsersUnder18(elements))
            //{
            //    System.Console.WriteLine(x);
            //}
            //System.Console.ReadKey();

            //foreach (var x in YieldTest.Fibonacci(10))
            //{
            //    System.Console.WriteLine(x);
            //}

            FrenchEncoding();

            System.Console.ReadKey();
        }

        private void CompressionTests()
        {
            //System.Console.ReadLine();
            //if(Directory.Exists(@"c:\frenchcoding\extract"))
            //{
            //    Directory.Delete(@"c:\frenchcoding\extract",true);
            //    File.Delete(@"c:\frenchcoding\start.zip");


            //}

            //using (ZipArchive archive = ZipFile.Open(@"c:\frenchcoding\start.zip", ZipArchiveMode.Create))
            //{
            //    archive.CreateEntryFromFile(@"c:\frenchcoding\test.txt", "test_compress.txt");
            //    archive.CreateEntryFromFile(@"c:\frenchcoding\test2.txt", "test_compress2.txt");
            //    archive.CreateEntryFromFile(@"c:\frenchcoding\test3.txt", "test_compress3.txt");
            //}

            //using (ZipArchive archive = ZipFile.Open(@"c:\frenchcoding\start.zip", ZipArchiveMode.Read))
            //{
            //    archive.ExtractToDirectory(@"c:\frenchcoding\extract\");
            //}

            //using (ZipArchive archive = ZipFile.Open(@"c:\frenchcoding\start.zip", ZipArchiveMode.Update))
            //{
            //    archive
            //        .GetEntry("test_compress2.txt")
            //        .Delete();
            //    archive
            //        .GetEntry("test_compress3.txt")
            //        .Delete();
            //}

            //using (FileStream zipToOpen = new FileStream(@"c:\frenchcoding\start.zip", FileMode.Open))
            //{
            //    using (ZipArchive archive = new ZipArchive(zipToOpen, ZipArchiveMode.Update))
            //    {
            //        ZipArchiveEntry readmeEntry = archive.CreateEntry("Readme.txt");
            //        using (StreamWriter writer = new StreamWriter(readmeEntry.Open()))
            //        {
            //            writer.WriteLine("Information about this package.");
            //            writer.WriteLine("========================");
            //        }
            //    }
            //}
        }

        private static void FrenchEncoding()
        {
            using (var fs = new FileStream(@"c:\frenchcoding\frenchencoding.csv", FileMode.OpenOrCreate, FileAccess.ReadWrite))
            {
                var preamble = new UTF8Encoding(true).GetPreamble();
                fs.Write(preamble,0,preamble.Count());

                var byteArrayLine1 = System.Text.Encoding.UTF8.GetBytes("courriel, nom, prénom"+Environment.NewLine);
                fs.Write(byteArrayLine1, 0, byteArrayLine1.Count());

                var byteArrayLine2 = System.Text.Encoding.UTF8.GetBytes("pascal.paradis@gmail.com, Paradis, Pascal");
                fs.Write(byteArrayLine2, 0, byteArrayLine2.Count());
            }
        }
    }
}
