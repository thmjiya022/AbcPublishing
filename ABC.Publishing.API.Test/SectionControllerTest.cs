using ABC.Publishing.API.Controllers;
using Microsoft.AspNetCore.Mvc;
using NUnit.Framework;

namespace ABC.Publishing.API.Test
{
    public class Tests
    {
        private SectionController _sectionController;

        [SetUp]
        public void SetUp()
        {
            _sectionController = new SectionController();
        }

        [Test]
        public void GIVEN_ExistingSectionName_WHEN_GetSectionIsCalled_THEN_ReturnsOkWithContent()
        {   
            //Arrange
            var sectionName = "bohemia-chapter-1";
            
            //Act
            var result = _sectionController.GetSection(sectionName);

            //Asert
            Assert.That(result, Is.InstanceOf<OkObjectResult>());
            var okResult = result as OkObjectResult;
            Assert.That(okResult?.Value, Is.Not.Null);
        }

        [Test]
        public void GIVEN_NonExistentSectionName_WHEN_GetSectionIsCalled_THEN_ReturnsNotFound()
        {
            //Arrange
            string sectionName = "thobani-section";

            //Act
            var result = _sectionController.GetSection(sectionName);

            //Assert
            Assert.That(result, Is.InstanceOf<NotFoundResult>());
        }
    }
}
