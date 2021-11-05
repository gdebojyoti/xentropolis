using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class UiInventorySlot : MonoBehaviour {
  public Image highlight;
  public Image image;
  public TextMeshProUGUI gui;
  public SO_Item item;
  public Inventory inventory; // inventory which this slot belongs to

  #region public methods
    public void UpdateUi (InventoryEntry entry) {
      _UpdateUi(entry);
      Debug.Log("Item details: " + entry.item.itemName + " " + entry.quantity);
    }

    // reset
    public void ResetUi () {
      this.item = null;
      image.sprite = null;
      gui.text = "";
    }
  #endregion

  #region private methods
    // logic for setting icon & text in slot UI
    public void _UpdateUi (InventoryEntry entry) {
      this.item = entry.item;
      image.sprite = entry.item.itemIcon; // item icon
      gui.text = entry.quantity.ToString(); // item count
    }
  #endregion
}