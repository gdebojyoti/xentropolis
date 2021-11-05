using UnityEngine;
using UnityEngine.UI;
using UnityEngine.EventSystems;

public class InventoryDragging : MonoBehaviour, IBeginDragHandler, IEndDragHandler, IDragHandler {
  public GameObject draggedItem;
  public GameObject itemPrefab;
  [SerializeField] private int dragOriginIndex;
  [SerializeField] private int dragDestinationIndex;
  private GameObject itemsParent;

  private void Start() {
    itemsParent = GameObject.FindGameObjectWithTag(Tags.itemsParentTransform);
  }

  #region interface methods
    public void OnBeginDrag (PointerEventData eventData) {
      dragOriginIndex = _GetSlotIndex(eventData);
      UiInventorySlot[] slots = gameObject.GetComponent<Inventory>().slots;

      // exit if drag source is invalid
      if (dragOriginIndex == -1 || slots[dragOriginIndex].item == null) {
        return;
      }

      _DrawDraggedItem(slots[dragOriginIndex].item);
    }
    public void OnDrag (PointerEventData eventData) {
      if (draggedItem.activeSelf) {
        _MoveDraggedItem(eventData.position);
      }
    }
    public void OnEndDrag (PointerEventData eventData) {
      // exit for invalid drag operation
      if (dragOriginIndex < 0) {
        return;
      }

      dragDestinationIndex = _GetSlotIndex(eventData);
      draggedItem.SetActive(false);

      if (dragDestinationIndex == -2) {
        _DropItemInWorld();
      }
    }
  #endregion

  private void _DropItemInWorld () {
    // calculate in-world position where item will be dropped
    Vector3 worldPos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
    worldPos.z = 0;

    SO_Item item = gameObject.GetComponent<Inventory>().slots[dragOriginIndex].item;

    // instantiate new game object from item prefab
    GameObject go = Instantiate(
      itemPrefab,
      worldPos,
      Quaternion.identity,
      itemsParent.transform
    );
    // set item code and icon
    Item goItem = go.GetComponent<Item>();
    goItem.itemCode = item.itemCode;
    SpriteRenderer image = go.GetComponent<SpriteRenderer>();
    image.sprite = item.itemIcon;

    // reduce item in inventory
    bool sup = gameObject.GetComponent<Inventory>().RemoveFromInventory(dragOriginIndex, 1);
    Debug.Log(sup);
  }

  private int _GetSlotIndex (PointerEventData eventData) {
    // return -1 if no GO is found
    GameObject slotGo = eventData.pointerCurrentRaycast.gameObject;
    if (slotGo == null) {
      Debug.Log("no go found");
      return -2;
    }

    // return -1 if invalid GO is selected
    UiInventorySlot slot = slotGo.GetComponent<UiInventorySlot>();
    if (slot == null) {
      Debug.Log("no slot found");
      return -1;
    }

    return System.Array.IndexOf(gameObject.GetComponent<Inventory>().slots, slot);
  }

  private void _DrawDraggedItem (SO_Item item) {
    Image draggedItemImage = draggedItem.GetComponent<Image>();
    draggedItemImage.sprite = item.itemIcon;
    draggedItem.SetActive(true);
  }

  private void _MoveDraggedItem (Vector2 pos) {
    draggedItem.transform.position = pos;
  }
}