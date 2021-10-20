using UnityEngine;

[CreateAssetMenu(fileName = "Inventory", menuName = "Collections/Inventory")]
public class SO_Inventory : ScriptableObject {
  public SO_Item[] items;
}