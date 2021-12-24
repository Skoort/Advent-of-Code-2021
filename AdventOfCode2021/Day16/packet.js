export function Packet(version, typeId, bitLength)
{
    this.version = version;
    this.typeId = typeId;
    this.bitLength = bitLength;

    this.versionSum = () => this.version;
    this.getValue = () => undefined;
    this.toString = () => undefined;
}

export function OperatorPacket(version, typeId, lengthTypeId, lengthTypeValue, operands, bitLength)
{
    Packet.call(this, version, typeId, bitLength);

    this.lengthTypeId = lengthTypeId;
    this.lengthTypeValue = lengthTypeValue;
    this.operands = operands;

    this.versionSum = () => this.version + operands.map(x => x.versionSum()).reduce(function(a, b) { return a + b; }, 0);
    this.getValue = () =>
    {
        if (this.typeId == 0)
        {
            return this.operands.map(x => x.getValue()).reduce((x, y) => x + y, 0);
        } else
        if (this.typeId == 1)
        {
            var product = 1;
            for (let i = 0; i < this.operands.length; ++i)
            {
                product *= this.operands[i].getValue();
            }
            return product;
        } else
        if (this.typeId == 2)
        {
            return Math.min(...this.operands.map(x => x.getValue()));
        } else
        if (this.typeId == 3)
        {
            return Math.max(...this.operands.map(x => x.getValue()));
        } else
        if (this.typeId == 5)
        {
            return (this.operands[0].getValue() > this.operands[1].getValue())
                ? 1
                : 0;
        } else
        if (this.typeId == 6)
        {
            return (this.operands[0].getValue() < this.operands[1].getValue())
                ? 1
                : 0;
        } else
        if (this.typeId == 7)
        {
            return (this.operands[0].getValue() === this.operands[1].getValue())
                ? 1
                : 0;
        }
    };
    this.toString = () =>
    {
        if (this.typeId == 0)
        {
            return '(' + this.operands.map(x => x.toString()).join(' + ') + ')';
        } else
        if (this.typeId == 1)
        {
            return '(' + this.operands.map(x => x.toString()).join(' * ') + ')';
        } else
        if (this.typeId == 2)
        {
            return 'min(' + this.operands.map(x => x.toString()).join(', ') + ')';
        } else
        if (this.typeId == 3)
        {
            return 'max(' + this.operands.map(x => x.toString()).join(', ') + ')';
        } else
        if (this.typeId == 5)
        {
            return '(' + this.operands[0].toString() + ' > ' + this.operands[1].toString() + ')';
        } else
        if (this.typeId == 6)
        {
            return '(' + this.operands[0].toString() + ' < ' + this.operands[1].toString() + ')';
        } else
        if (this.typeId == 7)
        {
            return '(' + this.operands[0].toString() + ' = ' + this.operands[1].toString() + ')';
        }
    };
}

export function LiteralPacket(version, typeId, value, bitLength)
{
    Packet.call(this, version, typeId, bitLength);

    this.value = value;
    this.getValue = () => this.value;
    this.toString = () => this.value.toString();
}

export function hex2bin(packetHex)
{
    // For some reason this method fails and creates a number like 2.41341E21, which has half of the right side as 0.
    // let value = Number.parseInt(packetHex, 16);
    // return value.toString(2).padStart(packetHex.length * 4, '0');

    let packetBin = '';
    for (let i = 0; i < packetHex.length; i += 4)
    {
        const hexSlice = packetHex.slice(i, Math.min(i+4, packetHex.length));
        packetBin += Number.parseInt(hexSlice, 16).toString(2).padStart(hexSlice.length * 4, '0');
    }
    return packetBin;
}

export function parsePacket(packetBin)
{
    let currSlice = "";
    let unreadSlice = packetBin;
    let bitLength = 0;  // This is the length of the packet in bits without padding.

    function read(n, elementName)
    {
        if (unreadSlice.length < n)
        {
            throw new Error(`Failed to read element '${elementName}'.`);
        }
        currSlice = unreadSlice.slice(0, n);
        unreadSlice = unreadSlice.slice(n, unreadSlice.length);
        bitLength += n;
        return currSlice;
    }

    const version = Number.parseInt(read(3, 'version'), 2);
    const typeId = Number.parseInt(read(3, 'typeId'), 2);

    if (typeId === 4)
    {
        let numGroup = '';
        let numBin = '';
        do
        {
            numGroup = read(5, 'value');
            numBin += numGroup.slice(1, 5);
        }
        while(numGroup[0] != '0');

        return new LiteralPacket(version, typeId, Number.parseInt(numBin, 2), bitLength);
    }
    else
    {
        const operands = [];
        const lengthTypeId = Number.parseInt(read(1, 'lengthTypeId'), 2);
        if (lengthTypeId == 0)
        {
            const subpacketLength = Number.parseInt(read(15, 'subpacketLength'), 2);
            const totalPacketLength = bitLength + subpacketLength;

            while (bitLength < totalPacketLength)
            {
                let operandPacket = parsePacket(unreadSlice);
                operands.push(operandPacket);

                read(operandPacket.bitLength, 'The operand was already parsed.');
            }

            return new OperatorPacket(version, typeId, lengthTypeId, subpacketLength, operands, bitLength);
        }
        else
        {
            const numSubpackets = Number.parseInt(read(11, 'numSubpackets'), 2);

            while (operands.length < numSubpackets)
            {
                let operandPacket = parsePacket(unreadSlice);
                operands.push(operandPacket);

                read(operandPacket.bitLength, 'The operand was already parsed.');
            }

            return new OperatorPacket(version, typeId, lengthTypeId, numSubpackets, operands, bitLength);
        }
    }
}