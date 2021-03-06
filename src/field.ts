import Node = require('./node');
import Delimiters = require("./delimiters");
import ValueNode = require("./valueNode");
import FieldRepetition = require("./fieldRepetition");
import NodeBase = require('./nodeBase');

class Field extends ValueNode {

    constructor(parent: NodeBase, key: string, text: string) {
        super(parent, key, text, Delimiters.Repetition);
    }

    addRepetition(value: string = ""): void {

        this.addChild(value);
    }

    read(path: string[]): Node {

        if(this.children.length > 0) {
            return this.children[0].read(path);
        }

        return null;
    }

    protected writeCore(path: string[], value: string): void {

        this._ensureChild().write(path, value);
    }

    protected createChild(text: string, index: number): Node {

        return new FieldRepetition(this, this.key, text);
    }

    private _ensureChild(): Node {

        var child: Node;

        // create a repetition if we do not have one already
        if(this.children.length == 0) {
            child = this.createChild("", 0);
            this.setChild(child, 0);
        }
        else {
            child = this.children[0];
        }

        return child;
    }
}

export = Field;