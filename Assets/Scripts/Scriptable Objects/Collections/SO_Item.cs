using UnityEngine;

[CreateAssetMenu(fileName = "New item", menuName = "Collections/Item")]
public class SO_Item : ScriptableObject {
  public int itemCode;
  public string itemName;
  public ItemType itemType;
  public string itemDescription;
  public Sprite itemIcon;
}