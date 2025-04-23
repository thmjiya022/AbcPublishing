using System.Text.Json;
using ABC.Publishing.API.Models;

namespace ABC.Publishing.API
{
    public class JsonDeserializer
    {
        public Dictionary<string, Section> GetDictionary(string filePath)
        {
            var sectionsJson = File.ReadAllText(filePath);

            return JsonSerializer.Deserialize<Dictionary<string, Section>>(sectionsJson, new JsonSerializerOptions(JsonSerializerDefaults.Web));
        }
    }
}
