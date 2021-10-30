// use this to create inventories such as player inventory, chest, shopkeeper inventory

using UnityEngine;
using System.Collections.Generic;

public class Inventory : MonoBehaviour {
  [SerializeField] public List<InventoryEntry> entries = new List<InventoryEntry>();
  public UiInventorySlot[] slots;

  // add a certain quanity of a particular item to inventory
  public void AddToInventory (SO_Item newItem, int quantity) {
    Debug.Log("count = " + entries.Count);
    
    // loop through all items in this inventory
    foreach (InventoryEntry entry in entries) {
      // if item already exists, increment its quantity by `quantity`
      if (newItem == entry.item) {
        entry.quantity += quantity;
        Debug.Log("cycle 1" + entry.quantity);
        _UpdateUi();
        return;
      }
      Debug.Log("cycle 2");
    }

    // reaching here means that item to be added is missing in this inventory
    // hence, initiate new entry and set quantity
    InventoryEntry newEntry = new InventoryEntry(newItem, quantity);
    entries.Add(newEntry);

    _UpdateUi();
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

  // update the inventory UI (eg: bar at the bottom of the screen)
  private void _UpdateUi () {
    for (var i = 0; i < entries.Count; i++) {
      InventoryEntry entry = entries[i];
      slots[i].image.sprite = entry.item.itemIcon; // item icon
      slots[i].gui.text = entry.quantity.ToString(); // item count
      Debug.Log("Item details: " + entry.item.itemName + " " + entry.quantity);
    }
  }
}