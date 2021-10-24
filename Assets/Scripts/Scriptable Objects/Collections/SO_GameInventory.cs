// catalogue of all items available in game

using UnityEngine;

[CreateAssetMenu(fileName = "Game Inventory", menuName = "Collections/Game Inventory")]
public class SO_GameInventory : ScriptableObject {
  public SO_Item[] items;
}