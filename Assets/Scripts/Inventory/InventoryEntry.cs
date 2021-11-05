// "entry" that goes in each inventory slot

using System;
using UnityEngine;

[Serializable]
public class InventoryEntry {
  public SO_Item item; // actual item entity
  public int quantity; // number of items in this stack
  public int slotIndex; // position of this entry in relevant inventory

  public InventoryEntry (SO_Item item, int quantity, int slotIndex) {
    this.item = item;
    this.quantity = quantity;
    this.slotIndex = slotIndex;
  }
}