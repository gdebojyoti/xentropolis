using UnityEngine;

public class ItemPickUp : MonoBehaviour {
  public SO_Inventory gameInventory;

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
      Debug.Log("Name: " + itemDetails.itemName);
      Debug.Log("Desc: " + itemDetails.itemDescription);
    } else {
      Debug.Log("Unknown object!");
    }
  }
}