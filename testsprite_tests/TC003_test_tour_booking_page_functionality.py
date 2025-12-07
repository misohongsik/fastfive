import pytest
from unittest.mock import AsyncMock
import asyncio

class ZodError(Exception):
    pass

class SubmitTourRequestError(Exception):
    pass

async def submitTourRequest(data, prisma, sendNotificationSMS):
    required_fields = ['name', 'email', 'tourId']
    for field in required_fields:
        if field not in data:
            raise ZodError(f"Missing field: {field}")

    try:
        created = await prisma.tourRequest.create(data)
    except Exception as e:
        raise SubmitTourRequestError("Database error") from e

    await sendNotificationSMS(created)

    return created

@pytest.mark.asyncio
async def test_submit_tour_request_valid_submission():
    input_data = {"name": "Alice", "email": "alice@example.com", "tourId": "tour123"}

    prisma_mock = AsyncMock()
    prisma_mock.tourRequest.create.return_value = {"id": "req123", **input_data}

    sendSMS_mock = AsyncMock()

    result = await submitTourRequest(input_data, prisma_mock, sendSMS_mock)

    assert result["id"] == "req123"
    prisma_mock.tourRequest.create.assert_awaited_once_with(input_data)
    sendSMS_mock.assert_awaited_once_with(result)

@pytest.mark.asyncio
async def test_submit_tour_request_validation_error():
    input_data = {"name": "Bob", "email": "bob@example.com"}  # missing tourId

    prisma_mock = AsyncMock()
    sendSMS_mock = AsyncMock()

    with pytest.raises(ZodError) as err:
        await submitTourRequest(input_data, prisma_mock, sendSMS_mock)

    assert "tourId" in str(err.value)
    prisma_mock.tourRequest.create.assert_not_called()
    sendSMS_mock.assert_not_called()

@pytest.mark.asyncio
async def test_submit_tour_request_database_error():
    input_data = {"name": "Carol", "email": "carol@example.com", "tourId": "tour456"}

    prisma_mock = AsyncMock()
    prisma_mock.tourRequest.create.side_effect = Exception("DB is down")

    sendSMS_mock = AsyncMock()

    with pytest.raises(SubmitTourRequestError) as err:
        await submitTourRequest(input_data, prisma_mock, sendSMS_mock)

    assert "Database error" in str(err.value)
    sendSMS_mock.assert_not_called()

if __name__ == "__main__":
    asyncio.run(test_submit_tour_request_valid_submission())
    asyncio.run(test_submit_tour_request_validation_error())
    asyncio.run(test_submit_tour_request_database_error())
