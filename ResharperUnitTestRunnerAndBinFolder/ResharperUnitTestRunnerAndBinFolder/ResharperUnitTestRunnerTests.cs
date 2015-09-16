using System.IO;
using System.Linq;
using System.Reflection;
using NUnit.Framework;

namespace ResharperUnitTestRunnerAndBinFolder
{
    [TestFixture]
    public class ResharperUnitTestRunnerTests
    {
        [Test]
        public void LoadAssembliesFromBinFolder_Test()
        {
            // arrange
            const int expected = 2;
            var binPath = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);

            // act 
            var assemblies = Directory.GetFiles(binPath, "*.dll").Select(Assembly.LoadFile).ToArray();

            // assert
            Assert.AreEqual(expected, assemblies.Length);
        }
    }
}
