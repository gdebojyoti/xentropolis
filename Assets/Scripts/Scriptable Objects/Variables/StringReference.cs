using UnityEngine;

[CreateAssetMenu(fileName = "New string variable", menuName = "Variables/String")]
public class StringReference : ScriptableObject {
  public string value;
  public string description;
}