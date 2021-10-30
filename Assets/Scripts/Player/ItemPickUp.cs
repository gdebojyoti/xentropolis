using UnityEngine;

public class ItemPickUp : MonoBehaviour {
  public SO_GameInventory gameInventory;
  public Inventory inventory;

  private void OnTriggerEnter2D(Collider2D other) {
    Item itemCollidedWith = other.GetComponent<Item>();

    // exit if collided object is not an "item"
    if (itemCollidedWith == null) {
      return;
    }

    SO_Item itemDetails = null;

    // get all details of item by matching itemCode
    foreach (SO_Item item in gameInventory.items) {
      if (itemCollidedWith.itemCode == item.itemCode) {
        itemDetails = item;
      }
    }

    if (itemDetails != null) {
      Debug.Log("Name: " + itemDetails.itemName + "; Desc: " + itemDetails.itemDescription);

      inventory.AddToInventory(itemDetails, 1);
    } else {
      Debug.Log("Unknown object!");
    }
  }
}