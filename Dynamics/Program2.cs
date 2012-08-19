using System;
using System.IO;
using System.IO.Compression;

namespace ConsoleApplication
{
    class Program
    {
        static void Main(string[] args)
        {
            //using (FileStream zipToOpen = new FileStream(@"c:\users\exampleuser\release.zip", FileMode.Open))
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

            //using (ZipArchive archive = ZipFile.Open(@"c:\frenchcoding\start.zip", ZipArchiveMode.Update))
            //{
            //    archive.CreateEntryFromFile(@"c:\test.txt", "test_compress.txt");
            //    archive.CreateEntryFromFile(@"c:\test2.txt", "test_compress2.txt");
            //    archive.CreateEntryFromFile(@"c:\test3.txt", "test_compress2.txt");
            //    archive.ExtractToDirectory(@"c:\frenchcoding\extract\");
            //}
        }
    }
}
