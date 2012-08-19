using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Text;

namespace Console
{
    class Program
    {
        static void Main(string[] args)
        {
            System.Console.ReadLine();
            if(Directory.Exists(@"c:\frenchcoding\extract"))
            {
                Directory.Delete(@"c:\frenchcoding\extract",true);
                File.Delete(@"c:\frenchcoding\start.zip");


            }
            
            using (ZipArchive archive = ZipFile.Open(@"c:\frenchcoding\start.zip", ZipArchiveMode.Create))
            {
                archive.CreateEntryFromFile(@"c:\frenchcoding\test.txt", "test_compress.txt");
                archive.CreateEntryFromFile(@"c:\frenchcoding\test2.txt", "test_compress2.txt");
                archive.CreateEntryFromFile(@"c:\frenchcoding\test3.txt", "test_compress3.txt");
            }

            using (ZipArchive archive = ZipFile.Open(@"c:\frenchcoding\start.zip", ZipArchiveMode.Read))
            {
                archive.ExtractToDirectory(@"c:\frenchcoding\extract\");
            }

            using (ZipArchive archive = ZipFile.Open(@"c:\frenchcoding\start.zip", ZipArchiveMode.Update))
            {
                archive
                    .GetEntry("test_compress2.txt")
                    .Delete();
                archive
                    .GetEntry("test_compress3.txt")
                    .Delete();
            }

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
    }
}
