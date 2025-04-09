using System.Text.Json;
using ABC.Publishing.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace ABC.Publishing.API.Controllers;

[ApiController]
[Route("[controller]")]
public class SectionController : ControllerBase
{
    private const string FilePath = "C:\\Users\\TewahidoTefera\\source\\repos\\ABC.Publishing.API\\ABC.Publishing.API\\JsonData\\AbcData.json";
    private JsonDeserializer _jsonDeserializer;
    private readonly Dictionary<string, Section> _sections;

    public SectionController()
    {
        _jsonDeserializer = new JsonDeserializer();
        _sections = _jsonDeserializer.GetDictionary(FilePath);
    }

    [HttpGet("{sectionName}")]
    public IActionResult GetSection(string sectionName)
    {
        if (_sections.ContainsKey(sectionName))
        {
            return Ok(_sections[sectionName]);
        }

        return NotFound();
    }
}
