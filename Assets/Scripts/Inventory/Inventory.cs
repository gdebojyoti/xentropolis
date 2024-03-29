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

    // get first free slot index
    int freeSlotIndex = System.Array.FindIndex(slots, slot => slot.item == null);

    // reaching here means that item to be added is missing in this inventory
    // hence, initiate new entry and set quantity
    // TODO: handle out of bounds cases (i.e., freeSlotIndex = -1)
    InventoryEntry newEntry = new InventoryEntry(newItem, quantity, freeSlotIndex);
    entries.Add(newEntry);

    _UpdateUi();
  }

  // remove a certain quantity of a certain item from inventory;
  // return true if successful, false for failure
  public bool RemoveFromInventory (int index, int quantity) {
    foreach (InventoryEntry entry in entries) {
      if (index == entry.slotIndex) {
        if (entry.quantity < quantity) {
          return false;
        }
        entry.quantity -= quantity;
        if (entry.quantity == 0) {
          entries.Remove(entry);
        }
        _UpdateUi();
        return true;
      }
    }

    return false;
  }

  // swap items in 2 positions
  public void SwapItems (int originIndex, int destinationIndex) {
    // ignore if both values are same
    if (originIndex == destinationIndex) {
      return;
    }
    
    foreach (InventoryEntry entry in entries) {
      if (entry.slotIndex == originIndex) {
        entry.slotIndex = destinationIndex;
      } else if (entry.slotIndex == destinationIndex) {
        entry.slotIndex = originIndex;
      }
    }
    _UpdateUi();
  }

  // update the inventory UI (eg: bar at the bottom of the screen)
  private void _UpdateUi () {
    // clear all inventory slots
    for (var i = 0; i < slots.Length; i++) {
      slots[i].ResetUi();
    }

    // check each item's slot index, and update the corresponding slot's UI
    for (var i = 0; i < entries.Count; i++) {
      InventoryEntry entry = entries[i];
      slots[entry.slotIndex].UpdateUi(entry);
    }
  }
}