using UnityEngine;
// using System.Collections.Generic;
// using System.Linq;

public class PlayerController : MonoBehaviour {
  public float moveSpeed = 5f;
  public Rigidbody2D rb;

  Vector2 movement;

  // private void Start() {
  //   // sample code for testing Lambda expressions
  //   List<int> numbers = new List<int> {1, 2, 3, 4, 5, 6, 7};
  //   List<int> aboveFive = numbers.Where(n => n > 5).ToList();
  //   Debug.Log(aboveFive);
  // }

  private void Update() {
    // check for inputs
    movement.x = Input.GetAxisRaw("Horizontal");
    movement.y = Input.GetAxisRaw("Vertical");

    // check for "interact"
    if (Input.GetKeyDown(KeyCode.E)) {
      _Interact();
    }
  }

  private void FixedUpdate() {
    // perform movement
    rb.MovePosition(rb.position + movement * moveSpeed * Time.fixedDeltaTime);
  }

  private void _Interact () {
    float col = Mathf.Floor(rb.position.x);
    float row = Mathf.Floor(rb.position.y);
    Debug.Log("interacted..." + col + " " + row);
  }
}