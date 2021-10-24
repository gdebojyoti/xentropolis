using System;
using UnityEngine;

[Serializable]
public class InventoryEntry {
  public SO_Item item;
  public int quantity;

  public InventoryEntry (SO_Item item, int quantity) {
    this.item = item;
    this.quantity = quantity;
  }
}