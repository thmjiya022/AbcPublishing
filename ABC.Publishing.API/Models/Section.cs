namespace ABC.Publishing.API.Models;

public class Section
{
    public string Title {  get; set; }
    public List<string> Content { get; set; }
    public List<NavigationLink> Navigation { get; set; }
}
