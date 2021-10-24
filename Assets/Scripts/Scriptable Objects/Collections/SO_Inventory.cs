// use this to create inventories such as player inventory, chest, shopkeeper inventory

using UnityEngine;
using System.Collections.Generic;

[CreateAssetMenu(fileName = "Inventory", menuName = "Collections/Inventory")]
public class SO_Inventory : ScriptableObject {
  [SerializeField] public List<InventoryEntry> entries = new List<InventoryEntry>();

  // add a certain quanity of a particular item to inventory
  public void AddToInventory (SO_Item newItem, int quantity) {
    bool isAdded = false;
    Debug.Log("count = " + entries.Count);
    
    foreach (InventoryEntry entry in entries) {
      if (newItem == entry.item) {
        entry.quantity += quantity;
        Debug.Log("cycle 1" + entry.quantity);
        _PrintInventory();
        return;
      }
      Debug.Log("cycle 2");
    }

    if (!isAdded) {
      InventoryEntry newEntry = new InventoryEntry(newItem, quantity);
      entries.Add(newEntry);
    }

    _PrintInventory();
  }

  // remove a certain quantity of a certain item from inventory;
  // return true if successful, false for failure
  public bool RemoveFromInventory (SO_Item newItem, int quantity) {
    foreach (InventoryEntry entry in entries) {
      if (newItem == entry.item) {
        if (entry.quantity < quantity) {
          return false;
        }
        entry.quantity -= quantity;
        return true;
      }
    }

    return false;
  }

  private void _PrintInventory () {
    foreach (InventoryEntry entry in entries) {
      Debug.Log("Item details: " + entry.item.itemName + " " + entry.quantity);
    }
  }
}